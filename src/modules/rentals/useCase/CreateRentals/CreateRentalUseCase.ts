import { inject, injectable } from "tsyringe";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository";
import { RentalRepository } from "@modules/rentals/repositories/RentalRepository";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(RentalRepository)
    private rentalsRepository: IRentalRepository,
    @inject(DayJsDateProvider)
    private dayjsDateProvider: DayJsDateProvider,
    @inject(CarsRepository)
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car already rented");
    }

    const userAlreadyHasRental =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);
    if (userAlreadyHasRental) {
      throw new AppError("User already has a rental");
    }

    const dateNow = this.dayjsDateProvider.dateNow();

    const expectedReturnDate = this.dayjsDateProvider.compareDates(
      expected_return_date,
      dateNow
    );

    if (expectedReturnDate < 24) {
      throw new AppError("The expected return date has to be a lest 24h");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

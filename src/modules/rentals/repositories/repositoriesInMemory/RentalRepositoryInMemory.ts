import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import {
  ICreateRentalDTO,
  IRentalRepository,
} from "@modules/rentals/interface/IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rental: Rental[] = [];
  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    return this.rental.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    return this.rental.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      id,
      end_date,
      total,
    });

    this.rental.push(rental);

    return rental;
  }
  async findById(id: string): Promise<Rental | undefined> {
    return this.rental.find((rental) => rental.id === id);
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rental.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalRepositoryInMemory };

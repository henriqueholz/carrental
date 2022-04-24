import { getRepository, Repository } from "typeorm";

import { Rental } from "../infra/typeorm/entities/Rental";
import {
  ICreateRentalDTO,
  IRentalRepository,
} from "../interface/IRentalRepository";

export class RentalRepository implements IRentalRepository {
  private repoitory: Repository<Rental>;

  constructor() {
    this.repoitory = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    const openByCar = this.repoitory.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return openByCar;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const openByUser = this.repoitory.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return openByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repoitory.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });

    await this.repoitory.save(rental);
    return rental;
  }
  async findById(id: string): Promise<Rental | undefined> {
    const rental = this.repoitory.findOne({ id });
    return rental;
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = this.repoitory.find({
      where: { user_id },
      relations: ["car"],
    });
    return rental;
  }
}

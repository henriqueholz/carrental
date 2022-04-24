import { Rental } from "../infra/typeorm/entities/Rental";

export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
}

export interface IRentalRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>;
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental | undefined>;
  findByUserId(user_id: string): Promise<Rental[]>;
}

export interface IRequestDevolution {
  id: string;
  user_id: string;
}

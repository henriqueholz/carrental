import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with existent car plate", async () => {
    await createCarUseCase.execute({
      name: "Name car 2",
      description: "Description car 2",
      daily_rate: 200,
      license_plate: "ABC-1234",
      fine_amount: 70,
      brand: "brand 2",
      category_id: "Category 2",
    });

    await expect(
      createCarUseCase.execute({
        name: "Name car",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "Category",
      })
    ).rejects.toEqual(new AppError(""));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "Category",
    });
    expect(car.available).toBe(true);
  });
});

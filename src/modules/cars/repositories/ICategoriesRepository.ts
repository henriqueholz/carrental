import { Category } from "../entities/Category";
import { CategoriesRepository } from "./implementations/CategoriesRepository";
// import { CategoriesRepository } from "../infra/typeorm/repositories/CategoriesRepository";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
export { ICategoriesRepository, ICreateCategoryDTO };

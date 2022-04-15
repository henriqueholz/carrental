import { Specification } from "../model/Specification";

// DTO => Data transfer object
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  // findByName(name: string): Specification;
  // list(): Specification[];
  create({ name, description }: ICreateSpecificationDTO): void;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };

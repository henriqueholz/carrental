import { SpecificationsRepository } from "../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: SpecificationsRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationService };

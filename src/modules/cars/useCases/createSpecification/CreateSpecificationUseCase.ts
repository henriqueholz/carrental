import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private SpecificationRepository: SpecificationsRepository) {}

  execute({ description, name }: IRequest): void {
    const SpecificationAlreadyExists =
      this.SpecificationRepository.findByName(name);

    if (SpecificationAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.SpecificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

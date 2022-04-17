import { response, Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);

// specificationRoutes.get("/", (request, response) => {
//   const all = specificationRepository.list();

//   return response.json(all);
// });

export { specificationRoutes };

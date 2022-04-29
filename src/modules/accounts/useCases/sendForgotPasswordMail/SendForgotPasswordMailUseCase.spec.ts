import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRespositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokenRepositoryinMemory: UsersTokenRespositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Password M", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokenRepositoryinMemory = new UsersTokenRespositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryinMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "123",
      email: "test_email@test.com",
      name: "Test",
      password: "123",
    });

    await sendForgotPasswordMailUseCase.execute("test_email@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password email if user not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("test_email2@test.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users token", async () => {
    const generatedTpkenEmail = jest.spyOn(
      usersTokenRepositoryinMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "1243",
      email: "test_email3@test.com",
      name: "Test3",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("test_email3@test.com");

    expect(generatedTpkenEmail).toHaveBeenCalled();
  });
});

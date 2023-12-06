import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("AnswerQuestionUseCase", () => {

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
	})

	it("should answer a question", async () => {
		const { answer } = await sut.execute({
			questionId: "2",
			instructorId: "1",
			content: "Answer content"
		})

		expect(answer.id).toBeTruthy()
		expect(answer.content).toEqual("Answer content")
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
	})
})
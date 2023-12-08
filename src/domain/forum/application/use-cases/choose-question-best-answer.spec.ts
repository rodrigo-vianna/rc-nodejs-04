import { makeAnswer } from "../../../../../test/factories/make-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("ChooseQuestionBestAnswerUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
	})

	it("should be able to choose the question best answer", async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id
		})

		await inMemoryQuestionsRepository.create(question)
		await inMemoryAnswersRepository.create(answer)

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: question.authorId.value
		})

		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toBe(answer.id)
	})

	it("should not be able to choose another user quesiton best answer", async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			authorId: new UniqueEntityId('author-1'),
			questionId: question.id
		})

		await inMemoryQuestionsRepository.create(question)
		await inMemoryAnswersRepository.create(answer)

		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: 'author-2'
		})

		expect(result.isLeft()).toBeTruthy()
		expect(result.value).toBeInstanceOf(NotAllowedError)
		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toBeFalsy()
	})
})
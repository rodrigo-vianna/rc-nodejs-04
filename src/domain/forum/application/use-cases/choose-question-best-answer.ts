import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
	answerId: string
	authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
	question: Question
}

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private readonly questionsRepository: QuestionsRepository,
		private readonly answersRepository: AnswersRepository
		) {}

	public async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if(!answer) {
			throw new Error("Answer not found")
		}

		const question = await this.questionsRepository.findById(answer.questionId.value)

		if(!question) {
			throw new Error("Question not found")
		}

		if(question.authorId.value !== authorId) {
			throw new Error("Unauthorized")
		}

		question.bestAnswerId = answer.id

		await this.questionsRepository.save(question)

		return { question }
	}
}

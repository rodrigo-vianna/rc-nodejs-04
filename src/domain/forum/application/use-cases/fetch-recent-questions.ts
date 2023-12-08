import { Either, right } from '../../../../core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsUseCaseRequest {
	page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<{}, { questions: Question[] }>

export class FetchRecentQuestionsUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	public async execute({
		page,
	}: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({page})
		return right({ questions })
	}
}

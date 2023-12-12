import { Either, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
	instructorId: string
	questionId: string
	content: string
	attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<{}, {
	answer: Answer
}>

export class AnswerQuestionUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	public async execute({
		instructorId,
		questionId,
		content,
		attachmentsIds
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		})

		const attachments = attachmentsIds.map((attachmentId) => {
			return AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				answerId: new UniqueEntityId(),
			})
		})
		answer.attachments = new AnswerAttachmentList(attachments);

		await this.answersRepository.create(answer)
		return right({ answer })
	}
}

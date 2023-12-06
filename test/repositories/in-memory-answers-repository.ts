import { PaginationParams } from "../../src/core/repositories/pagination-params"
import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository"
import { Answer } from "../../src/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRepository {
	public readonly items: Answer[] = []

	public async findById(id: string): Promise<Answer | null> {
		return this.items.find(answer => answer.id.value === id) ?? null
	}

	public async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
		const answers = this.items
			.filter(answer => answer.questionId.value === questionId)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20)
		return answers
	}

	public async create(answer: Answer): Promise<void> {
		this.items.push(answer)
	}

	public async save(answer: Answer): Promise<void> {
		const index = this.items.findIndex(item => item.id.value === answer.id.value)
		this.items[index] = answer
	}

	public async delete(answer: Answer): Promise<void> {
		const index = this.items.findIndex(item => item.id.value === answer.id.value)
		this.items.splice(index, 1)
	}
}

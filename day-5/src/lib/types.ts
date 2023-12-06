export type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export interface Task {
	elf: string;
	task: TaskType;
	minutesTaken: number;
	date: string;
}

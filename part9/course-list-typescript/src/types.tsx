export interface CourseName {
    name: string;
}

export interface CoursePart {
    name: string;
    exerciseCount: number;
}

export interface CourseParts {
    parts: Array<CoursePart>;
}
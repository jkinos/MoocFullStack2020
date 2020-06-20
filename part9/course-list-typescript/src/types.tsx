export type CourseName = string;

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
export interface CourseWithDescription extends CoursePartBase{
    description: string;
}

export interface CoursePartOne extends CourseWithDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends CourseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CourseWithDescription{
    name: 'React Recoil';
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

import { Project } from "../../types";

export interface PostPutProjectProps {
    defaultValues: Project | null;
    onSuccess?: ( project: Project ) => void;
}

import { Project } from "../../../types";
import { useGetRequest } from "../../use-get-request";
import { UseGetProjectsOptions } from "./types";

export function useGetProjects( options?: UseGetProjectsOptions ) {
    const params: Record<string, string> = {
        type: options?.type ?? "own"
    }
    if (options && options.userId) {
        params.userId = options.userId.toString()
    }
    const searchParams = new URLSearchParams( params );
    return useGetRequest<Project[]>( [], `/api/user/projects?${ searchParams.toString() }` );
}

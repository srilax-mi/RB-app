import commonAPI from "./common";
import baseUrl from "./baseurl";

// addResumeAPI - PUSH
export const addResumeAPI = async(resume)=>{
    return await commonAPI("POST",`${baseUrl}/resumes`,resume)
}

// editResumeAPI - PUT

export const editResumeAPI = async(id,resume)=>{
    return await commonAPI("PUT",`${baseUrl}/resumes/${id}`,resume)
}

// addDownloadHistory

export const addDownloadHistoryAPI = async(resume)=>{
    return await commonAPI("POST",`${baseUrl}/history`,resume)
}

// getDownloadHistory

export const getDownloadHistoryAPI = async()=>{
    return await commonAPI("GET",`${baseUrl}/history`,{})
}

// deleteDownloadHistory

export const deleteDownloadHistoryAPI = async(id)=>{
    return await commonAPI("DELETE",`${baseUrl}/history/${id}`,{})
}

// getResumeAPI

export const getResumeAPI=async(id)=>{
    return await commonAPI("GET",`${baseUrl}/resumes/${id}`,{})
}
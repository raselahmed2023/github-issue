const loadIssue=async()=>{
    const response=await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data= await response.json()
    // console.log(data.data);

    const issueCards=document.getElementById('issueCards');
}

loadIssue();
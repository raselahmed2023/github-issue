let allIssues = ''


function showAllIssues(issues) {

    document.getElementById('issueCount').innerText = issues.length + ' Issues';
    const issueCard = document.getElementById('issueCards');
    issueCard.innerHTML = '';

    issues.forEach(issue => {

        const card = document.createElement('div');

        card.className = `card bg-base-100 shadow-sm p-3 mt-5 space-y-4 border-t-2 ${issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500'}`;

        card.onclick = function () {
            modalShow(issue.id)
        }

        const statusIcon = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png';

        let labelsHTML = '';
        for (let label of issue.labels) {
            if (label === 'bug') {
                labelsHTML = labelsHTML + '<span class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i>BUG</span>'
            } else if (label === 'help wanted') {
                labelsHTML = labelsHTML + '<span class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>HELP WANTED</span>'
            } else if (label === 'enhancement') {
                labelsHTML = labelsHTML + '<span class="badge badge-soft badge-info"><i class="fa-solid fa-star"></i>ENHANCEMENT</span>';
            } else if (label === 'documentation') {
                labelsHTML = labelsHTML + '<span class="badge badge-soft badge-success"><i class="fa-solid fa-file-shield"></i>DOCUMENTATION</span>';
            } else if (label === 'good first issue') {
                labelsHTML = labelsHTML + '<span class="badge badge-soft badge-secondary"><i class="fa-solid fa-clover"></i>GOOD FIRST ISSUE</span>';
            }
        }

        card.innerHTML = `
                   <div class="flex justify-between items-center">
               <img src="${statusIcon}" class="w-5 h-5" alt="">
               <span class="badge badge-soft text-xs font-bold ${issue.priority === 'high' ? 'badge-error' :
                issue.priority === 'medium' ? 'badge-warning' :
                    'badge-ghost'}">${issue.priority}</span>
           </div>
           <div class="card-body p-0 ">
               <h2 class="card-title font-semibold">${issue.title}</h2>
               <p class="text-gray-400">${issue.description}</p>
           </div>
           <div class="flex flex-wrap gap-2">${labelsHTML}</div>

           <hr class="opacity-10  mt-2 mb-2 -mx-3">
           <div>
               <span class="text-gray-400">${issue.assignee}</span> <br>
               <span class="text-gray-400">${issue.createdAt}</span>
           </div>
        
        `

        issueCard.appendChild(card);

    });
}

const loadIssue = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await response.json()
    allIssues = data.data;
    showAllIssues(allIssues);
}


function filter(tab) {
    if (tab === 'all') {
        showAllIssues(allIssues);
    } else if (tab === 'open') {
        showAllIssues(allIssues.filter(issue => issue.status === 'open'));

    } else if (tab === 'closed') {
        showAllIssues(allIssues.filter(issue => issue.status === 'closed'));
    }
}



const modalShow = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayModal(details.data)
}

const displayModal = (issueDetails) => {

    let modalLabelsHTML = '';
    for (let label of issueDetails.labels) {
        if (label === 'bug') {
            modalLabelsHTML = modalLabelsHTML + '<span class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i>BUG</span>';
        } else if (label === 'help wanted') {
            modalLabelsHTML = modalLabelsHTML + '<span class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>HELP WANTED</span>';
        } else if (label === 'enhancement') {
            modalLabelsHTML = modalLabelsHTML + '<span class="badge badge-soft badge-info"><i class="fa-solid fa-star"></i>ENHANCEMENT</span>';
        } else if (label === 'documentation') {
            modalLabelsHTML = modalLabelsHTML + '<span class="badge badge-soft badge-success"><i class="fa-solid fa-file-shield"></i>DOCUMENTATION</span>';
        } else if (label === 'good first issue') {
            modalLabelsHTML = modalLabelsHTML + '<span class="badge badge-soft badge-secondary"><i class="fa-solid fa-clover"></i>GOOD FIRST ISSUE</span>';
        }
    }
    const detailsContainer = document.getElementById('details-Container');
    
    detailsContainer.innerHTML = `
                     <h2 class="text-2xl font-bold">${issueDetails.title}</h2>
                 <div class="flex gap-3">
                     <div class="badge ${issueDetails.status==="open"?'badge-dash badge-primary':"badge-dash badge-secondary"}">${issueDetails.status}</div>
                     <div>. Opened by ${issueDetails.assignee} . ${issueDetails.updatedAt}</div>
                 </div>
                 <div class="flex flex-wrap gap-2">${modalLabelsHTML}</div>
                
                 <p class="text-gray-400">${issueDetails.description}</p>
                 <div class="flex gap-4 justify-around items-center bg-base-200 p-4">
                     <div>
                         <h2 class="text-gray-400">Assignee:</h2>
                         <h1 class="text-xl font-bold">${issueDetails.assignee}</h1>
                     </div>
                     
                     <div>
                         <h2 class="text-gray-400">Priority:</h2>
                         <p class="badge badge-soft text-xl m-0 p-0 font-bold ${issueDetails.priority === 'high' ? 'badge-error' : issueDetails.priority === 'medium' ? 'badge-warning' : 'badge-ghost'}">
                         ${issueDetails.priority}</p>
                     </div>
                 </div>
    
    
    `
    document.getElementById('issue_modal').showModal();

}



loadIssue();
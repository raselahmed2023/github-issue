const loadIssue = async () => {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await response.json()
    const issues = data.data;

    const issueCard = document.getElementById('issueCards');
    issueCard.innerHTML = '';


    issues.forEach(issue => {

        const card = document.createElement('div');
        card.className = "card bg-base-100 shadow-sm p-3 mt-5 space-y-4 ";

        card.innerHTML = `
                   <div class="flex justify-between items-center">
               <img src="./assets/Open-Status.png" class="w-5 h-5" alt="">
               <span class="badge badge-soft text-xs font-bold ${issue.priority==='high'? 'badge-error': 
                issue.priority==='medium'? 'badge-warning': 
                'badge-ghost'}">${issue.priority}</span>
           </div>
           <div class="card-body p-0 ">
               <h2 class="card-title font-semibold">${issue.title}</h2>
               <p class="text-gray-400">${issue.description}</p>
           </div>
           <div class="flex flex-wrap gap-2">
               <span class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i>BUG</span>
               <span class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>HELP
                   WANTED</span>
           </div>
           <hr class="opacity-10  mt-2 mb-2 -mx-3">
           <div>
               <span class="text-gray-400">${issue.assignee}</span> <br>
               <span class="text-gray-400">${issue.createdAt}</span>
           </div>
        
        `

        issueCard.appendChild(card);



    });

}

loadIssue();
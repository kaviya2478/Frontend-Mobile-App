function select(elem) {
    return document.querySelector(elem);
}

let users=[
    {
        profilePic:"./images/Model1.jpg",
        displayPic:"./images/Model4.jpg",
        pendingMessage:4, 
        location:"Haryana, India", 
        name:"Yashi", 
        age:22, 
        interests:[{
            icon:`<i class="ri-music-2-fill"></i>`,
            interests: "Music"
        } ,{
            icon:`<i class="ri-emotion-happy-line"></i>`,
            interests: "Modeling"
        }],
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores.",
        isFriend:null
    },
    {
        profilePic:"./images/Model6.jpg",
        displayPic:"./images/Model7.jpg",
        pendingMessage:4, 
        location:"Chennai, India", 
        name:"Sarah", 
        age:25, 
        interests:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interests: "Journaling"
        } ,{
            icon:`<i class="ri-emotion-happy-line"></i>`,
            interests: "Modeling"
        }],
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores.",
        isFriend:null
    },
    {
        profilePic:"./images/Model3.jpg",
        displayPic:"./images/Model9.jpg",
        pendingMessage:4, 
        location:"Punjab, India", 
        name:"Zoya", 
        age:25, 
        interests:[{
            icon:`<i class="ri-music-2-fill"></i>`,
            interests: "Music"
        } ,{
            icon:`<i class="ri-emotion-happy-line"></i>`,
            interests: "Modeling"
        }],
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores.",
        isFriend:null
    },
    {
        profilePic:"./images/Model2.jpg",
        displayPic:"./images/Model8.jpg",
        pendingMessage:4, 
        location:"Delhi, India", 
        name:"Harshita", 
        age:25, 
        interests:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interests: "Journaling"
        } ,{
            icon:`<i class="ri-emotion-happy-line"></i>`,
            interests: "Modeling"
        }],
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores.",
        isFriend:null
    },
    {
        profilePic:"./images/Model10.jpg",
        displayPic:"./images/Model5.jpg",
        pendingMessage:4, 
        location:"Coimbatore, India", 
        name:"Vaishnavi", 
        age:21, 
        interests:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interests: "Journaling"
        } ,{
            icon:`<i class="ri-music-2-fill"></i>`,
            interests: "Music"
        }],
        bio:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolores.",
        isFriend:null
    },
];

let curr=0;
let isAnimating=false;

function setData(index){
    select(".prflimg img").src = users[index].profilePic;
    select(".badge h5").textContent = users[index].pendingMessage;
    select(".location h3").textContent = users[index].location; 
    const nameElements = select(".name").children;
    if (nameElements.length >= 2) {
        nameElements[0].textContent = users[index].name;
        nameElements[1].textContent = users[index].age;
    } else {
        console.error("Name and Age elements are not properly structured in the DOM");
    }

    let clutter = "";
    users[index].interests.forEach(function (interest) {
        clutter += `<div class="tag flex items-center bg-white/30 px-3 py-1 rounded-full gap-3">
                        ${interest.icon}
                        <h3 class="text-sm tracking-tight capitalize">${interest.interests}</h3>
                    </div>`;
    });
    select(".tags").innerHTML = clutter;

    select(".bio p").textContent=users[curr].bio;
}

(function setInitial() {
    select(".maincard img").src = users[curr].displayPic;
    select(".incomingcard img").src = users[curr + 1]?.displayPic || ""; // Handle out-of-bounds gracefully
    
    setData(curr);

    curr=2;

})();

function imageChange(){
    if(!isAnimating){
        isAnimating=true;
        let tl=gsap.timeline({
            onComplete:function(){
               isAnimating=false;
               let main = select(".maincard");
               let incoming = select(".incomingcard");
    
               incoming.classList.remove("z-[2]");
               incoming.classList.add("z-[3]");
               incoming.classList.remove("incomingcard");
    
               main.classList.remove("z-[3]");
               main.classList.add("z-[2]");
               gsap.set(main,{
                scale:1,
                opacity:1
               })
               if(curr === users.length) curr=0;
               select(".maincard img").src=users[curr].displayPic;
               curr++;
               main.classList.remove("maincard");
               incoming.classList.add("maincard");
               main.classList.add("incomingcard");
            }
        });

        tl.to(".maincard",{
            scale:1.1,
            opacity:0,
            ease:Circ,
            duration:.9
        }, "a")
        .from(".incomingcard",{
            scale:.9,
            opacity:0,
            ease:Circ,
            duration:1.1
        }, "a")
    }

};

let deny= select(".deny");
let accept= select(".accept")

deny.addEventListener("click", function() {
    imageChange();
    setData(curr-1);
    gsap.from(".details .element",{
        y:"100%",
        opacity:0,
        stagger:.06,
        ease: Power4.easeInOut,
        duration:1.5
       })
});

accept.addEventListener("click", function() {
    imageChange();
    setData(curr-1);
    gsap.from(".details .element",{
        y:"100%",
        opacity:0,
        stagger:.06,
        ease: Power4.easeInOut,
        duration:1.5
       })
});

function containerCreator(){
    document.querySelectorAll(".element")
    .forEach(function(element){
        let div= document.createElement("div");
        div.classList.add(`${element.classList[1]}container`, `overflow-hidden`);
        div.appendChild(element);
        select(".details").appendChild(div);

    })

};


const holidays = [
    {
      hdate: "01-01-2023",
      holiday: "New Year Day",
    },
    {
      hdate: "15-01-2023",
      holiday: "Pongal",
    },
    {
      hdate: "16-01-2023",
      holiday: "Thiruvalluvar Day",
    },
    {
      hdate: "17-01-2023",
      holiday: "Uzhavar Thirunal",
    },
    {
      hdate: "26-01-2023",
      holiday: "Republic Day",
    },
    {
      hdate: "05-02-2023",
      holiday: "Thai Poosam",
    },
    {
      hdate: "22-03-2023",
      holiday: "Telugu New Year Day",
    },
    {
      hdate: "01-04-2023",
      holiday: "Annual closing of Accounts for Commercial Banks and Co-operative Banks",
    },
    {
      hdate: "04-04-2023",
      holiday: "Mahaveer Jayanthi",
    },
    {
      hdate: "07-04-2023",
      holiday: "Good Friday",
    },
    {
      hdate: "14-04-2023",
      holiday: "Tamil New Years Day and Dr.B.R.Ambedkars Birthday",
    },
    {
      hdate: "22-04-2023",
      holiday: "Ramzan (Idul Fitr)",
    },
    {
      hdate: "01-05-2023",
      holiday: "May Day",
    },
    {
      hdate: "29-06-2023",
      holiday: "Bakrid(Idul Azha)",
    },
    {
      hdate: "29-07-2023",
      holiday: "Muharram",
    },
    {
      hdate: "15-08-2023",
      holiday: "Independence Day",
    },
    {
      hdate: "06-09-2023",
      holiday: "Krishna Jayanthi",
    },
    {
      hdate: "17-09-2023",
      holiday: "Vinayakar Chathurthi",
    },
    {
      hdate: "28-09-2023",
      holiday: "Milad-un-Nabi",
    },
    {
      hdate: "02-10-2023",
      holiday: "Gandhi Jayanthi",
    },
    {
      hdate: "23-10-2023",
      holiday: "Ayutha Pooja",
    },
    {
      hdate: "24-10-2023",
      holiday: "Vijaya Dasami",
    },
    {
      hdate: "12-11-2023",
      holiday: "Deepavali",
    },
    {
      hdate: "25-12-2023",
      holiday: "Christmas",
    },
  ];
  const calendar = document.querySelector("#calendar");

  const monthBanner = document.querySelector("#month");
  let navigation = 0;
  let clicked = null;
  let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    function loadCalendar() {
    const dt = new Date();
  
    if (navigation != 0) {
      dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  
    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);
  
    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
      const dayBox = document.createElement("div");
      dayBox.classList.add("day");
      const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
      const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
      const dateText = `${dateVal}-${monthVal}-${year}`;
      if (i > emptyDays) {
        dayBox.innerText = i - emptyDays;
        //Event Day
        const eventOfTheDay = events.find((e) => e.date == dateText);
        //Holiday
        const holidayOfTheDay = holidays.find((e) => e.hdate == dateText);
  
        if (i - emptyDays === day && navigation == 0) {
          dayBox.id = "currentDay";
        }
  
        if (eventOfTheDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventOfTheDay.title;
          dayBox.appendChild(eventDiv);
        }
        if (holidayOfTheDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.classList.add("holiday");
          eventDiv.innerText = holidayOfTheDay.holiday;
          dayBox.appendChild(eventDiv);
        }
  
        dayBox.addEventListener("click", () => {
          showModal(dateText);
        });
      } else {
        dayBox.classList.add("plain");
      }
      calendar.append(dayBox);
    }
  }
  function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const btnDelete = document.querySelector("#btnDelete");
    const btnSave = document.querySelector("#btnSave");
    const closeButtons = document.querySelectorAll(".btnClose");
    const txtTitle = document.querySelector("#txtTitle");
  
    btnBack.addEventListener("click", () => {
      navigation--;
      loadCalendar();
    });
    btnNext.addEventListener("click", () => {
      navigation++;
      loadCalendar();
    });
    modal.addEventListener("click", closeModal);
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });
    btnDelete.addEventListener("click", function () {
      events = events.filter((e) => e.date !== clicked);
      localStorage.setItem("events", JSON.stringify(events));
      closeModal();
    });
  
    btnSave.addEventListener("click", function () {
      if (txtTitle.value) {
        txtTitle.classList.remove("error");
        events.push({
          date: clicked,
          title: txtTitle.value.trim(),
        });
        txtTitle.value = "";
        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
      } else {
        txtTitle.classList.add("error");
      }
    });
  } const modal = document.querySelector("#modal");
  const viewEventForm = document.querySelector("#viewEvent");
  const addEventForm = document.querySelector("#addEvent");
    function showModal(dateText) {
clicked = dateText;
    const eventOfTheDay = events.find((e) => e.date == dateText);
    if (eventOfTheDay) {
      //Event already Preset
      document.querySelector("#eventText").innerText = eventOfTheDay.title;
      viewEventForm.style.display = "block";
    } else {
      //Add new Event
      addEventForm.style.display = "block";
    }
    modal.style.display = "block";
  }
  
  //Close Modal
  function closeModal() {
    viewEventForm.style.display = "none";
    addEventForm.style.display = "none";
    modal.style.display = "none";
    clicked = null;
    loadCalendar();
  } buttons();
loadCalendar();
  
  /*
  1. Add Event     
  3. Update Local Storage  */


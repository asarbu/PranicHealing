document.addEventListener("DOMContentLoaded", async (event) => {
    const now = new Date().toISOString();
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent('asociatiapranichealing@gmail.com')}/events?key=${encodeURIComponent('AIzaSyD0UZN5b9sPmNQlQ1lAtkShgJmJ5iRmRPY')}&timeMin=${encodeURIComponent(now)}`);
    
    if(!response.ok) throw Error('Nu se pot incarca evenimentele din calendar');

    const calendar = await response.json();
    /** @type {Array} */
    let events = calendar.items;
    events = events.filter((event) => event.status === 'confirmed' && event.start && event.end);
    events.sort(function(a,b){
        return new Date(a.start.dateTime) - new Date(b.start.dateTime);
      });
    events.forEach((event) => {
        const eventList = document.getElementById('lista-evenimente');
        const eventListItem = document.createElement('li');
        const header = document.createElement('h5');
        header.textContent = event.summary;

        const dateOptions = {
            dateStyle: 'long',
            timeStyle: 'short',
        };
        const startDate = Date.parse(event.start.dateTime);
        const endDate = Date.parse(event.end.dateTime)
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = Intl.DateTimeFormat('ro-RO', dateOptions).format(startDate) + ' - ' + Intl.DateTimeFormat('ro-RO', dateOptions).format(endDate);

        const inscriere = document.createElement('div');
        const anchor = document.createElement('a');
        anchor.href = event.htmlLink;
        anchor.textContent = 'Inscriere';

        eventListItem.appendChild(header);
        eventListItem.appendChild(dateParagraph);
        if(event.description) {
            var t = document.createElement('template');
            t.innerHTML = event.description;
            eventListItem.appendChild(t.content);
        }
        inscriere.appendChild(anchor);
        eventListItem.appendChild(inscriere);
        eventList.appendChild(eventListItem);
    });

    document.getElementById('wapp-button')?.addEventListener('click', () => {
        const number = '40771337297';
        const wappName = document.getElementById('wapp-name').value;
        const wappNumber = document.getElementById('wapp-number').value;
        const encodedMessage = encodeURIComponent(`Buna ziua! Ma numesc ${wappName} si as dori sa aflu mai mutle despre Pranic Healing. Va rog sa ma contactati la numarul de telefon ${wappNumber}`);
        const url = `https://wa.me/${number}?text=${encodedMessage}`;
        window.open(url, '_blank');
    })
});
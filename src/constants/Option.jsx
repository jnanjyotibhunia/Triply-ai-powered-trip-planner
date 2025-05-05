export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '✈️',
      people: '1 Person',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '🥂',
      people: '2 People',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '🏡',
      people: '3 to 5 People',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of thrill-seekers',
      icon: '⛵',
      people: '5 to 10 People',
    }
  ];


export const SelectBudgetList = [
    {
      id: 1,
      icon: '💵',
      title: 'Cheap',
      desc: 'Stay conscious of costs',
    },
    {
      id: 2,
      icon: '💰',
      title: 'Moderate',
      desc: 'Keep cost on the average side',
    },
    {
      id: 3,
      icon: '💸',
      title: 'Luxury',
      desc: 'Don’t worry about cost',
    }
  ];
  

  
  export const AI_PROMPT = 
  "Generate a travel plan for the location: {location}, for {totalDays} days, for {traveler}, with a {budget} budget. Provide a list of hotels (field name: hotelOptions) with the following fields: hotelName, hotelAddress, price (must be filled), hotelImageUrl, geoCoordinates, rating, and description. Also, create an itinerary array (field name: itinerary), where each element represents a day and includes: a 'day' field (formatted as 'Day 1', 'Day 2', etc.) and a 'plan' array. Each 'plan' array should include the following fields for places: placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, travelTime, and bestTimeToVisit (formatted as a single string in AM - PM). Ensure all field names strictly follow camelCase in the JSON output.";



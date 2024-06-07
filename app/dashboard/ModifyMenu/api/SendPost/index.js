import excuteQuery from '@/lib/db';

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
      const result = await excuteQuery({
        query: 'INSERT INTO users (Classification, Name, Price, Introduce, Picture, currentSeason) VALUES(?, ?, ?, ?, ?, ?)',
        values: [areas, newItem.name, newItem.money, newItem.description, newItem.name, newItem.switchOn],
    });
      console.log( "ttt",result );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };
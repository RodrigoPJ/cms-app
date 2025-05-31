import {Request, Response, NextFunction } from  'express';

// SSE endpoint
export default async function setServerEvent (req:Request, res: Response, next:NextFunction) {
  // Headers to establish SSE stream
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  let id = 0;
  const timer = setInterval(() => {
    id++;
    const payload = JSON.stringify({ time: new Date().toISOString() });
    // SSE format: id, event name (optional), and data
    res.write(`id: ${id}\nevent: tick\ndata: ${payload}\n\n`);
  }, 1000);

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(timer);
  });
}

// this is how to use in the client side to set the connectio to allow for server events
// const es = new EventSource('http://localhost:3000/events');
// es.onmessage( (e)=> {
//   const { time } = JSON.parse(e.data);
//   console.log('Server time:', time);
// });
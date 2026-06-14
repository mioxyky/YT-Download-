import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, type, quality, format } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400, headers: corsHeaders() });
    }

    try {
      // Primary approach: Use ytdl-core to get video info and direct download URLs
      const info = await ytdl.getInfo(url);
      
      let formatObj;
      if (type === 'audio') {
        formatObj = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      } else {
        // Find best matching video quality
        const videoQuality = quality === 'Meilleure qualité' ? 'highestvideo' : quality;
        formatObj = ytdl.chooseFormat(info.formats, { quality: videoQuality, filter: 'audioandvideo' });
        if (!formatObj) {
           // fallback to highest
           formatObj = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        }
      }

      if (formatObj && formatObj.url) {
        return NextResponse.json({
          success: true,
          downloadUrl: formatObj.url,
          title: info.videoDetails.title
        }, { headers: corsHeaders() });
      }
    } catch (ytdlError) {
      console.warn("ytdl-core failed, falling back to public API", ytdlError);
    }

    // Fallback approach: Use a public API (like Cobalt.tools)
    const cobaltRes = await fetch('https://co.wuk.sh/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        vQuality: quality === 'Meilleure qualité' ? 'max' : quality.replace('p', ''),
        isAudioOnly: type === 'audio',
        aFormat: format === 'mp3' ? 'mp3' : 'best'
      })
    });

    if (cobaltRes.ok) {
      const data = await cobaltRes.json();
      if (data && data.url) {
        return NextResponse.json({
          success: true,
          downloadUrl: data.url
        }, { headers: corsHeaders() });
      }
    }

    return NextResponse.json({ error: 'Failed to extract download link.' }, { status: 500, headers: corsHeaders() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

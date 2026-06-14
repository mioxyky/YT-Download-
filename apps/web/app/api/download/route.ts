import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

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
    } catch (ytdlError: any) {
      console.warn("ytdl-core failed:", ytdlError);
      return NextResponse.json({ error: 'Failed to extract download link. YouTube may be blocking the server IP.' }, { status: 500, headers: corsHeaders() });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

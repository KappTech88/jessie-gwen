export type Difficulty = 'beginner' | 'intermediate' | 'intense';

export interface Video {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration?: string;
  difficulty?: Difficulty;
  description?: string;
}

// Parse duration from video title
function parseDuration(title: string): string | undefined {
  const lower = title.toLowerCase();
  const match = lower.match(/(\d+)\s*min/);
  if (match) return `${match[1]} min`;
  const minuteMatch = lower.match(/(\d+)\s*minute/);
  if (minuteMatch) return `${minuteMatch[1]} min`;
  if (lower.includes('under 10')) return '10 min';
  return undefined;
}

// Parse difficulty from video title
function parseDifficulty(title: string): Difficulty {
  const lower = title.toLowerCase();
  if (lower.includes('beginner') || lower.includes('easy') || lower.includes('everyday') || lower.includes('side-lying')) {
    return 'beginner';
  }
  if (lower.includes('intense') || lower.includes('insanely') || lower.includes('extreme') || lower.includes('explosive') || lower.includes('major') || lower.includes('maximum') || lower.includes('fire')) {
    return 'intense';
  }
  return 'intermediate';
}

// Add metadata to a video entry
function enrichVideo(video: Video): Video {
  return {
    ...video,
    duration: video.duration || parseDuration(video.title),
    difficulty: video.difficulty || parseDifficulty(video.title),
  };
}

// Parse YouTube video ID from URL
export function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// Parse video data from the playlist_urls.txt file content
export function parseVideoData(fileContent: string): Video[] {
  const lines = fileContent.split('\n').filter(line => line.trim() && !line.includes('==='));
  const videos: Video[] = [];

  for (const line of lines) {
    const urlMatch = line.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (urlMatch) {
      const videoId = urlMatch[1];
      const titleMatch = line.split(' - ').slice(1).join(' - ').trim();

      // Filter out non-workout videos
      const title = titleMatch || 'Workout Video';
      if (!title.toLowerCase().includes('goat') && !title.toLowerCase().includes('hip hop')) {
        videos.push({
          id: videoId,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          title: title,
          thumbnail: getYouTubeThumbnail(videoId, 'high'),
        });
      }
    }
  }

  return videos;
}

// Static video data (parsed from playlist_urls.txt)
export const workoutVideos: Video[] = [
  {
    id: 'ZHYUcyUqZPc',
    url: 'https://www.youtube.com/watch?v=ZHYUcyUqZPc',
    title: 'EASY + INSTANT Booty Pump Workout - NO Equipment!',
    thumbnail: getYouTubeThumbnail('ZHYUcyUqZPc', 'high'),
  },
  {
    id: 'o8UMUcgwjFs',
    url: 'https://www.youtube.com/watch?v=o8UMUcgwjFs',
    title: 'EASY Booty Pump Workout - FAST Results - EQUIPMENT NOT REQUIRED',
    thumbnail: getYouTubeThumbnail('o8UMUcgwjFs', 'high'),
  },
  {
    id: 'Git4BNFgZPo',
    url: 'https://www.youtube.com/watch?v=Git4BNFgZPo',
    title: '7 Minute Tone + Butt Lift Workout for Beginners',
    thumbnail: getYouTubeThumbnail('Git4BNFgZPo', 'high'),
  },
  {
    id: 'XL-NcSe2JS8',
    url: 'https://www.youtube.com/watch?v=XL-NcSe2JS8',
    title: 'Get a Bubble Butt & Flat Belly At Home - FAST RESULTS + NO EQUIPMENT!',
    thumbnail: getYouTubeThumbnail('XL-NcSe2JS8', 'high'),
  },
  {
    id: 'KJiRI6vFRTk',
    url: 'https://www.youtube.com/watch?v=KJiRI6vFRTk',
    title: 'EXPLOSIVE BOOTY PUMP in JUST 10 Min!',
    thumbnail: getYouTubeThumbnail('KJiRI6vFRTk', 'high'),
  },
  {
    id: 'jNgDNQ7hWNM',
    url: 'https://www.youtube.com/watch?v=jNgDNQ7hWNM',
    title: 'BEST BOOTY Boosting Workout for MAX GROWTH in Just 2 Weeks',
    thumbnail: getYouTubeThumbnail('jNgDNQ7hWNM', 'high'),
  },
  {
    id: '1wyo5hQer_E',
    url: 'https://www.youtube.com/watch?v=1wyo5hQer_E',
    title: 'BOOTY PUMP in 10 Minutes at Home',
    thumbnail: getYouTubeThumbnail('1wyo5hQer_E', 'high'),
  },
  {
    id: 'kuuIKBNBKZ4',
    url: 'https://www.youtube.com/watch?v=kuuIKBNBKZ4',
    title: 'BEST CURVY HIPS AND BOOTY Workout at Home',
    thumbnail: getYouTubeThumbnail('kuuIKBNBKZ4', 'high'),
  },
  {
    id: 'qfEOp7JmVtE',
    url: 'https://www.youtube.com/watch?v=qfEOp7JmVtE',
    title: 'INSTANT BOOTY PUMP - 12 Min Intense burn',
    thumbnail: getYouTubeThumbnail('qfEOp7JmVtE', 'high'),
  },
  {
    id: 'A-VcNtArh48',
    url: 'https://www.youtube.com/watch?v=A-VcNtArh48',
    title: '8 MIN EASY Beginner Friendly Booty Workout',
    thumbnail: getYouTubeThumbnail('A-VcNtArh48', 'high'),
  },
  {
    id: 'ZZE78gjyFUc',
    url: 'https://www.youtube.com/watch?v=ZZE78gjyFUc',
    title: 'Major Butt Lift in 14 Days! - Only 2 Exercises',
    thumbnail: getYouTubeThumbnail('ZZE78gjyFUc', 'high'),
  },
  {
    id: 'q7LdTqfBweA',
    url: 'https://www.youtube.com/watch?v=q7LdTqfBweA',
    title: 'SMALL WAIST + ROUND BOOTY Workout for Quick Results',
    thumbnail: getYouTubeThumbnail('q7LdTqfBweA', 'high'),
  },
  {
    id: 'o__w6D4bCC8',
    url: 'https://www.youtube.com/watch?v=o__w6D4bCC8',
    title: 'INTENSE BUTT LIFT - Grow Your Booty Quick at Home in 10 Minutes!',
    thumbnail: getYouTubeThumbnail('o__w6D4bCC8', 'high'),
  },
  {
    id: 'qpTIFCnBPuY',
    url: 'https://www.youtube.com/watch?v=qpTIFCnBPuY',
    title: 'EVERYDAY INSTANT BOOTY PUMP Workout From Home',
    thumbnail: getYouTubeThumbnail('qpTIFCnBPuY', 'high'),
  },
  {
    id: '3Lj4AqBbMCQ',
    url: 'https://www.youtube.com/watch?v=3Lj4AqBbMCQ',
    title: 'INSANELY MASSIVE BOOTY LIFT WORKOUT - Only 13 Minutes',
    thumbnail: getYouTubeThumbnail('3Lj4AqBbMCQ', 'high'),
  },
  {
    id: 'olCGfYEDBNg',
    url: 'https://www.youtube.com/watch?v=olCGfYEDBNg',
    title: 'INCREDIBLE BOOTY PUMP WORKOUT - Amazing Results at Home',
    thumbnail: getYouTubeThumbnail('olCGfYEDBNg', 'high'),
  },
  {
    id: 'gVxd8rIicSw',
    url: 'https://www.youtube.com/watch?v=gVxd8rIicSw',
    title: 'BEST EXERCISES TO GROW & LIFT YOUR BOOTY',
    thumbnail: getYouTubeThumbnail('gVxd8rIicSw', 'high'),
  },
  {
    id: 'IYwtCPDwE9k',
    url: 'https://www.youtube.com/watch?v=IYwtCPDwE9k',
    title: 'TINY HOURGLASS WAIST AND PLUMP BUTT WORKOUT',
    thumbnail: getYouTubeThumbnail('IYwtCPDwE9k', 'high'),
  },
  {
    id: '3N5GHojbEkY',
    url: 'https://www.youtube.com/watch?v=3N5GHojbEkY',
    title: 'CURVY BOOTY at Home - MAJOR PUMP',
    thumbnail: getYouTubeThumbnail('3N5GHojbEkY', 'high'),
  },
  {
    id: '_XyUkgfHVW4',
    url: 'https://www.youtube.com/watch?v=_XyUkgfHVW4',
    title: 'Unlock Your BEST Glutes | 3 Exercises for MAXIMUM Growth!',
    thumbnail: getYouTubeThumbnail('_XyUkgfHVW4', 'high'),
  },
  {
    id: '4leDl-KfMqE',
    url: 'https://www.youtube.com/watch?v=4leDl-KfMqE',
    title: '3 MUST DO EXERCISES TO SET YOUR GLUTES ON FIRE',
    thumbnail: getYouTubeThumbnail('4leDl-KfMqE', 'high'),
  },
  {
    id: 'yosXrUc9ZhQ',
    url: 'https://www.youtube.com/watch?v=yosXrUc9ZhQ',
    title: 'Booty Burn Prep GRWM For an INTENSE Workout at Home',
    thumbnail: getYouTubeThumbnail('yosXrUc9ZhQ', 'high'),
  },
  {
    id: 'vATqEOXBp68',
    url: 'https://www.youtube.com/watch?v=vATqEOXBp68',
    title: 'INTENSE BOOTY LIFT Workout for Major Gains',
    thumbnail: getYouTubeThumbnail('vATqEOXBp68', 'high'),
  },
  {
    id: 'Yy_UgnR-oC8',
    url: 'https://www.youtube.com/watch?v=Yy_UgnR-oC8',
    title: 'INCREDIBLE Booty Boosting Workout for REAL RESULTS in Just 14 Days',
    thumbnail: getYouTubeThumbnail('Yy_UgnR-oC8', 'high'),
  },
  {
    id: 'zr9HrpseoMQ',
    url: 'https://www.youtube.com/watch?v=zr9HrpseoMQ',
    title: 'MAJOR BUTT LIFT In Under 10 Minutes',
    thumbnail: getYouTubeThumbnail('zr9HrpseoMQ', 'high'),
  },
  {
    id: 'bhL-_19yOwI',
    url: 'https://www.youtube.com/watch?v=bhL-_19yOwI',
    title: 'The JUICIEST BOOTY With No Equipment',
    thumbnail: getYouTubeThumbnail('bhL-_19yOwI', 'high'),
  },
  {
    id: 'D8ubjZkgOB0',
    url: 'https://www.youtube.com/watch?v=D8ubjZkgOB0',
    title: 'Beginner Glute Workout at Home',
    thumbnail: getYouTubeThumbnail('D8ubjZkgOB0', 'high'),
  },
  {
    id: 'qu2tHsiqjBE',
    url: 'https://www.youtube.com/watch?v=qu2tHsiqjBE',
    title: 'Everyday Side-Lying Glute Workout',
    thumbnail: getYouTubeThumbnail('qu2tHsiqjBE', 'high'),
  },
  {
    id: 'MDUmsqKB7Fk',
    url: 'https://www.youtube.com/watch?v=MDUmsqKB7Fk',
    title: 'Round Booty Workout at Home',
    thumbnail: getYouTubeThumbnail('MDUmsqKB7Fk', 'high'),
  },
  {
    id: 'llEzsdm32-E',
    url: 'https://www.youtube.com/watch?v=llEzsdm32-E',
    title: 'Glute Pulse Workout - Plump & Lift Your Booty at Home',
    thumbnail: getYouTubeThumbnail('llEzsdm32-E', 'high'),
  },
  {
    id: 'sj4R0QBzA40',
    url: 'https://www.youtube.com/watch?v=sj4R0QBzA40',
    title: 'EXTREME Booty Pump - No Squats, No Equipment',
    thumbnail: getYouTubeThumbnail('sj4R0QBzA40', 'high'),
  },
  {
    id: '90KI63D4lu8',
    url: 'https://www.youtube.com/watch?v=90KI63D4lu8',
    title: 'Booty Lifting Workout at Home - Floor Only, No Equipment',
    thumbnail: getYouTubeThumbnail('90KI63D4lu8', 'high'),
  },
].map(enrichVideo);

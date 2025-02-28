export const actions = {
  main_menu: 'main_menu',
  download_video: 'download_video',
  save_video: 'save_video',
  get_description: 'get_description',
  choice_channel: 'choice_channel',
  download_image: 'download_image',
  create_series: 'create_series',
  get_series_number: 'get_series_number',
  get_series_image: 'get_series_image',
  get_series_videos: 'get_series_videos',
  get_series_description: 'get_series_description',
  choice_channel_for_series: 'choice_channel_for_series',
  login: 'login',
  login_password: 'login_password',
  create_movie_simple: 'create_movie_simple',
  save_video_for_simple_movie: 'save_video_for_simple_movie',
  get_series_title: 'get_series_title',
} as const;

export const actions_text = {
  main_menu: '🏠 Bosh sahifa',
  create_content: '🎬 Film yaratish',
  create_series: '🎞 Serial yaratish',
  write_description: '✍️ Description yozish',
  login: '👤 Kirish',
  create_movie_simple: '⚡️ Oson Film yaratish 🎬',
  done: '✅ Tayyor',
} as const;
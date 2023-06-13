// Convert to PascalCase
export function getPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convert ms to hours (Album/Playlist)
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function convertTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // setting units
  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  if (hours > 0)
    return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}min ${padTo2Digits(
      seconds
    )}sec`;
  return `${padTo2Digits(minutes)}min ${padTo2Digits(seconds)}sec`;
}

// Convert ms to hours (Track)
export function convertTimeTrack(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // setting units
  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  if (hours > 0) return `${hours} : ${minutes} : ${seconds}sec`;
  return `${padTo2Digits(minutes)} : ${padTo2Digits(seconds)}`;
}

// Return Album/Playlist duration
export function convertTotalDuration(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].track) result.push(arr[i].track.duration_ms);
    else result.push(arr[i].duration_ms);
  }
  const sum = result.reduce((partialSum, a) => partialSum + a, 0);
  return convertTime(sum);
}

// Convert release date
export function convertDate(date) {
  const releaseDate = new Date(date);
  const options = { year: "numeric", month: "long" };
  return releaseDate.toLocaleDateString("en-US", options);
}

// Return Genres or Artits list
export function getArrList(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    const pascalStr = getPascalCase(arr[i]);
    result.push(pascalStr);
  }
  return result.join(", ");
}

// Return array with every URI
export function getUri(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].track) result.push(arr[i].track.uri);
    else result.push(arr[i].uri);
  }
  return result;
}

// Return array with every URI shuffled
export function getShuffleUri(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].track) result.push(arr[i].track.uri);
    else result.push(arr[i].uri);
  }
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Temporary script to fetch Google Books cover URLs
import https from 'https';

const books = [
    { id: 1, title: "Killing Floor", year: 1997 },
    { id: 2, title: "Die Trying", year: 1998 },
    { id: 3, title: "Tripwire", year: 1999 },
    { id: 4, title: "Running Blind", year: 2000 },
    { id: 5, title: "Echo Burning", year: 2001 },
    { id: 6, title: "Without Fail", year: 2002 },
    { id: 7, title: "Persuader", year: 2003 },
    { id: 8, title: "The Enemy", year: 2004 },
    { id: 9, title: "One Shot", year: 2005 },
    { id: 10, title: "The Hard Way", year: 2006 },
    { id: 11, title: "Bad Luck and Trouble", year: 2007 },
    { id: 12, title: "Nothing to Lose", year: 2008 },
    { id: 13, title: "Gone Tomorrow", year: 2009 },
    { id: 14, title: "61 Hours", year: 2010 },
    { id: 15, title: "Worth Dying For", year: 2010 },
    { id: 16, title: "The Affair", year: 2011 },
    { id: 17, title: "A Wanted Man", year: 2012 },
    { id: 18, title: "Never Go Back", year: 2013 },
    { id: 19, title: "Personal", year: 2014 },
    { id: 20, title: "Make Me", year: 2015 },
    { id: 21, title: "Night School", year: 2016 },
    { id: 23, title: "Past Tense", year: 2018 },
    { id: 24, title: "Blue Moon", year: 2019 },
    { id: 25, title: "The Sentinel", year: 2020 },
    { id: 26, title: "Better Off Dead", year: 2021 },
    { id: 27, title: "No Plan B", year: 2022 }
];

async function fetchCoverUrl(title) {
    return new Promise((resolve, reject) => {
        const query = encodeURIComponent(`intitle:${title} inauthor:Lee Child`);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.items && json.items.length > 0) {
                        const imageLinks = json.items[0].volumeInfo.imageLinks;
                        if (imageLinks) {
                            // Get the highest quality available
                            const coverUrl = imageLinks.large || imageLinks.medium || imageLinks.thumbnail || imageLinks.smallThumbnail;
                            // Convert to https and increase zoom
                            const httpsUrl = coverUrl.replace('http:', 'https:').replace('zoom=1', 'zoom=0');
                            resolve(httpsUrl);
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    console.log('Fetching cover URLs from Google Books API...\n');
    const results = [];

    for (const book of books) {
        try {
            const url = await fetchCoverUrl(book.title);
            if (url) {
                console.log(`${book.id}. ${book.title} (${book.year}): FOUND`);
                results.push({ id: book.id, coverUrl: url });
            } else {
                console.log(`${book.id}. ${book.title} (${book.year}): NOT FOUND`);
            }
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e) {
            console.error(`Error fetching ${book.title}:`, e.message);
        }
    }

    const fs = await import('fs');
    fs.writeFileSync('cover-urls.json', JSON.stringify(results, null, 2));
    console.log('\nResults saved to cover-urls.json');
}

main();

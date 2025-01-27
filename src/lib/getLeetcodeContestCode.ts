
/* returns the contestCode of leetcode from contest Title*/
function getLeetcodeContestCode(contestTitle: string): string {
    // Convert the title to lowercase
    const lowercasedTitle = contestTitle.toLowerCase();

    // Replace spaces with dashes
    const contestCode = lowercasedTitle.replace(/\s+/g, '-');

    return contestCode;
}


export default getLeetcodeContestCode;
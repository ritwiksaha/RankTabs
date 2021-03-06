//Global Variables
var currWin = null, currTab=null;
var a=0,b=0, temp=0;
var str=null;
//Main function, iterates through each window,
function rank()
{
	console.log("Start");
	chrome.windows.getCurrent(thisWindow);
}
//Window function to iterate through  each tab
function thisWindow(window)
{
	currWin = window;
	chrome.tabs.getAllInWindow(currWin.id, goThruTabs);
}
//Calls the ranking function which indexes the tabs
function goThruTabs(array_of_tabs)
{
	chrome.windows.getAll({"populate" : true},rankTabs);
}
//Function traverses through the populated array of all the tabs, in all windows.
function rankTabs(winArray)
{
	for(a=0;a<winArray.length;a++)
		for(b=0;b<winArray[a].tabs.length;b++)
		{
			currTab=winArray[a].tabs[b];
			temp=currTab.title.indexOf(". ");
			console.log(temp);
			if(temp==1||temp==2)
				str = (1+currTab.index)+". "+currTab.title.substr(temp+2);	
			else
				str = (1+currTab.index)+". "+currTab.title;
			chrome.tabs.executeScript(currTab.id, {code:"document.title = '"+str+"'"});
			console.log(str);
			console.log(currTab.id);
		}
}
//On each event that modifies the index of the tab, it calls the main
chrome.tabs.onMoved.addListener(rank);
chrome.tabs.onCreated.addListener(rank);
chrome.tabs.onDetached.addListener(rank);
chrome.tabs.onRemoved.addListener(rank);
chrome.tabs.onUpdated.addListener(rank);

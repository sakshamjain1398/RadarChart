// Values for SVG attributes
var margin = {top: 100, right: 100, bottom: 100, left: 100},
width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
var color = d3.scale.ordinal()
	.range(["#EDC951","#CC333F","#00A0B0"]);
				
var radarChartOptions = {
  w: width+70,
  h: height,
  margin: margin,
  maxValue: 0.5,
  levels: 5,
  roundStrokes: true,
  color: color,
  labelFactor:1.35
};
d3.select("#intensity").property("checked",false);
d3.select("#likelihood").property("checked",false);
d3.select("#relevance").property("checked",true);

// Function for calling RadarChart function to create radar chart
function CallRadar(data,intensity,likelihood,relevance,prop) {
	var intensityData=[];
	var likelihoodData=[];
	var relevanceData=[];
	data.forEach( function(element, index) {
		if(element.intensity!=""){
			var idx=-1;
			for(var i=0;i<intensityData.length;i++){
			if(intensityData[i].axis==element[prop])
			{
				idx=i;
				break;
			}
		};
		if(idx==-1)
		{
			intensityData.push({
			axis : element[prop],
			value : element.intensity,
			count : 1
			});
		}
		else{
			intensityData[idx]={
			axis : element[prop],
			value : (element.intensity+intensityData[idx].value*intensityData[idx].count)/(intensityData[idx].count+1),
			count : intensityData[idx].count + 1
			}
		}
		}
		if(element.likelihood!="")
			{var idx=-1;
				for(var i=0;i<likelihoodData.length;i++){
					if(likelihoodData[i].axis==element[prop])
					{
					idx=i;
					break;
					}
				};
		if(idx==-1)
		{
			likelihoodData.push({
			axis : element[prop],
			value : element.likelihood,
			count : 1
			});
		}
		else{
			likelihoodData[idx]={
			axis : element[prop],
			value : (element.likelihood+likelihoodData[idx].value*likelihoodData[idx].count)/(likelihoodData[idx].count+1),
			count : likelihoodData[idx].count + 1
			}
		}
		}
		if(element.relevance!=""){
			var idx=-1;
			for(var i=0;i<relevanceData.length;i++){
				if(relevanceData[i].axis==element[prop])
				{
					idx=i;
					break;
				}
			};
		if(idx==-1)
		{
			relevanceData.push({
			axis : element[prop],
			value : element.relevance,
			count : 1
			});
		}
		else{
			relevanceData[idx]={
			axis : element[prop],
			value : (element.relevance+relevanceData[idx].value*relevanceData[idx].count)/(relevanceData[idx].count+1),
			count : relevanceData[idx].count + 1
			}
			}
		}
	});
	var newData=[];
	if(intensity)
	newData.push(intensityData);
	if(likelihood)
	newData.push(likelihoodData);
	if(relevance)
	newData.push(relevanceData);
	console.log(newData);
	RadarChart(".radarChart", newData, radarChartOptions, intensity, likelihood, relevance);
}
var lastShow="topic";
checkboxChange(lastShow);

//function to call CallRadar function and provide with necessary data
function checkboxChange(show) {
	CallRadar(data,d3.select("#intensity").property("checked"),d3.select("#likelihood").property("checked"),d3.select("#relevance").property("checked"),show);
}
d3.selectAll("input[type=checkbox]").on("change",function(){
	checkboxChange(lastShow);
})
d3.selectAll("input[type=radio]").on("change",function(){
	lastShow=this.value;
	checkboxChange(this.value);
})
//-------------------------------------------------------------------------
function terrainFromIteration(n, minX,maxX,minY,maxY, vertexArray, faceArray,normalArray)
{
    var deltaX=(maxX-minX)/n;
    var deltaY=(maxY-minY)/n;
    for(var i=0;i<=n;i++) {
       for(var j=0;j<=n;j++)
       {
           vertexArray.push(minX+deltaX*j);
           vertexArray.push(minY+deltaY*i);
           vertexArray.push(0);
           
           normalArray.push(0);	
           normalArray.push(0);
           normalArray.push(1);
       }
    }
    var zArray = new Array();
    
    for(var l = 2; l<vertexArray.length; l+=3){
    	zArray.push(vertexArray[l]);
    }

    diamondSquare(zArray, 0, 0, n, n, n);

    for(var i = 2; i<vertexArray.length; i+=3){
    	vertexArray[i] = zArray[(i-2)/3];	
    }

    var numT=0;
    for(var i=0;i<n;i++)
       for(var j=0;j<n;j++)
       {
           var vid = i*(n+1) + j;
           faceArray.push(vid);
           faceArray.push(vid+1);
           faceArray.push(vid+n+1);
           
           faceArray.push(vid+1);
           faceArray.push(vid+1+n+1);
           faceArray.push(vid+n+1);
           numT+=2;
       }
    return numT;
}

function diamondSquare(inputArray, minX, minY, maxX, maxY, n)
{
	var midX = Math.floor((minX + maxX)/2);
	var midY = Math.floor((minY + maxY)/2);	 
	var mid = midX + n*midY;
	if (minX < maxX - 1 && minY < maxY - 1) {
		inputArray[mid] = (inputArray[minX+n*minY] + inputArray[minX+n*maxY] + inputArray[n*minY+maxX] + inputArray[maxX + n*maxY])/4 + 0.2*Math.random();
		inputArray[midX + n*minY] = inputArray[mid];
		inputArray[minX + n*midY] = inputArray[mid];
		inputArray[maxX + n*midY] = inputArray[mid];
		inputArray[midX + n*maxY] = inputArray[mid];

		diamondSquare(inputArray, minX, minY, midX, midY, n);
		diamondSquare(inputArray, midX, midY, maxX, maxY, n);
		diamondSquare(inputArray, minX, midY, midX, maxY, n);
		diamondSquare(inputArray, midX, minY, maxX, midY, n);
	}
}




//-------------------------------------------------------------------------
function generateLinesFromIndexedTriangles(faceArray,lineArray)
{
    numTris=faceArray.length/3;
    for(var f=0;f<numTris;f++)
    {
        var fid=f*3;
        lineArray.push(faceArray[fid]);
        lineArray.push(faceArray[fid+1]);
        
        lineArray.push(faceArray[fid+1]);
        lineArray.push(faceArray[fid+2]);
        
        lineArray.push(faceArray[fid+2]);
        lineArray.push(faceArray[fid]);
    }
}

//-------------------------------------------------------------------------



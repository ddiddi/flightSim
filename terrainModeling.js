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
           vertexArray.push(Math.random(1));
           
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
    	vertexArray[i] = zArray[i/3];	
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
	var mid = (minX + maxX)/2 + n*(minY+maxY)/2 
	if (mid < 20) {
	inputArray[mid] = (inputArray[minX+n*minY] + inputArray[minX+n*maxY] + inputArray[n*minY+maxX] + inputArray[maxX + n*maxY])/4 + Math.random();
	diamondSquare(inputArray, minX, minY, mid, mid, n);
	diamondSquare(inputArray, mid, mid, maxX, maxY, n);
	diamondSquare(inputArray, minX, mid, mid, maxY, n);
	diamondSquare(inputArray, mid, minY, maxX, mid, n);
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



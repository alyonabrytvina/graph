### Link https://graph_lesha.surge.sh/

There is a graph. To see the result you need to enter JSON in the textarea (you can find 
examples in the end of the document). If you enter the incorrect data you see a red textarea 
border. 

###### You can click on the element inside graph and it will be selected and change color.
###### Graph is responsive if you'll change the window size.
###### You can see the clicked element and his parent in the devtools console.
For instance:

1) `{
"sources": [
{
"id": "src1",
"name": "Source1"
},
{
"id": "src2",
"name": "Source2"
},
{
"id": "src3",
"name": "Source3"
}
],
"targets": [
{
"id": "trg3",
"name": "Target3"
}
],
"actions": [
{
"id": "act5",
"prev": [
"src2"
],
"next": "act6"
},
{
"id": "act6",
"prev": [
"act5"
],
"next": "trg3"
}
]
}`

2) `{
   "sources": [
   {
   "id": "src1",
   "name": "Source1"
   },
   {
   "id": "src2",
   "name": "Source2"
   },
   {
   "id": "src3",
   "name": "Source3"
   }
   ],
   "targets": [
   {
   "id": "trg1",
   "name": "Target1"
   },
   {
   "id": "trg2",
   "name": "Target2"
   },
   {
   "id": "trg3",
   "name": "Target3"
   }
   ],
   "actions": [
   {
   "id": "act1",
   "prev": [
   "src1",
   "src2"
   ],
   "next": "act2"
   },
   {
   "id": "act2",
   "prev": [
   "act1"
   ],
   "next": "trg1"
   },
   {
   "id": "act3",
   "prev": [
   "src1"
   ],
   "next": "trg2"
   },
   {
   "id": "act3",
   "prev": [
   "src3"
   ],
   "next": "act4"
   },
   {
   "id": "act4",
   "prev": [
   "act3"
   ],
   "next": "act5"
   },
   {
   "id": "act5",
   "prev": [
   "act4",
   "src2"
   ],
   "next": "trg3"
   }
   ]
   }`

3) `{
   "sources": [
   {
   "id": "src1",
   "name": "Source1"
   },
   {
   "id": "src2",
   "name": "Source2"
   },
   {
   "id": "src3",
   "name": "Source3"
   }
   ],
   "targets": [
   {
   "id": "trg1",
   "name": "Target1"
   },
   {
   "id": "trg2",
   "name": "Target2"
   },
   {
   "id": "trg3",
   "name": "Target3"
   }
   ],
   "actions": [
   {
   "id": "act1",
   "prev": [
   "src1",
   "src2"
   ],
   "next": "act2"
   },
   {
   "id": "act2",
   "prev": [
   "act1"
   ],
   "next": "trg1"
   },
   {
   "id": "act3",
   "prev": [
   "src1"
   ],
   "next": "trg2"
   },
   {
   "id": "act3",
   "prev": [
   "src3"
   ],
   "next": "act4"
   },
   {
   "id": "act4",
   "prev": [
   "act3"
   ],
   "next": "act5"
   },
   {
   "id": "act5",
   "prev": [
   "act4",
   "src2"
   ],
   "next": "act6"
   },
   {
   "id": "act6",
   "prev": [
   "act5"
   ],
   "next": "act7"
   },
   {
   "id": "act7",
   "prev": [
   "act6"
   ],
   "next": "trg3"
   }
   ]
   }`
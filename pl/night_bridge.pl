% we need predicates from wolf_goat_cabbage. load that PL file before loading this one. We use the following predicates:
% dfs, choosePassengers, movePassengers
	
% Here's how we represent state: [LeftOccupants,RightOccupants,TorchPos(left,right),ElapsedTime(mins)]
	
% goal is no one left (empty sublist) on the left side
nbGoal([[],_,right,_]). 

%left-right move; one or two passengers cross
nbMove([Left,Right,left,ElapsedTime], [NewLeft,NewRight,right,NewElapsedTime]) :-
   nbMove(Left,Right,NewLeft,NewRight,ElapsedTime,NewElapsedTime).

%right-left move; one or two passengers cross
nbMove([Left,Right,right,ElapsedTime], [NewLeft,NewRight,left,NewElapsedTime]) :-
   nbMove(Right,Left,NewRight,NewLeft,ElapsedTime,NewElapsedTime).

% helper predicate
nbMove(CurrSide,NextSide,CurrSide2,NextSide2,ElapsedTime,NewElapsedTime) :-
   choosePassengers(CurrSide,Passengers),
   travelTime(Passengers,TravelTime),
   NewElapsedTime is ElapsedTime + TravelTime,
   NewElapsedTime < 16,
   movePassengers(Passengers,CurrSide,CurrSide2,NextSide,NextSide2Unsorted), 
   sort(NextSide2Unsorted, NextSide2).

% how fast everyone is
speed(a,1). speed(b,2).
speed(c,5). speed(d,8).

% travelTime(L,T) is the time is takes the list L of people to cross.
travelTime([X],T) :- speed(X,T).
travelTime([X1,X2], T) :- speed(X1,T1),speed(X2,T2),max_list([T1,T2],T).
	
% main search predicate
nbSearch(Path) :-
	InitState = [[a,b,c,d],[],left,0], 
	dfs(nbMove, nbGoal, InitState, [InitState], RevPath),
	% dfs algorithm gives path from last to first, reverse it to give forward path back to caller
	reverse(RevPath,Path).
	

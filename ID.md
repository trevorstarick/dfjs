#0x[a][bbb][cccc]

##a:[1] system (2)
	(0) - not used
	(1) - internal functions

##a:[2-f] type (14)
	(2,3,4) - block
	(5,6,7) - npc
	(8,9,10) - beast
	(a) - liquid
	(b,c,d,e) - item
	(f) - player

##b:[000-fff] modifier (4096)
	(0xx...fxx) - type
	(x00) - broken/dead
	(xx1...xxe) - strength/health
	(xff) - infinite
	
##c:[0000-ffff] ids (65535)
	(0000...ffff) - ids
	
#Examples
	0x0000000f - invalid
	0x1000001e - system function 0x001e
	0x3f001e07 - block type f that is broken with the id of 0x1e07
	0xdeadbeef - item type e with 0xad healthn and id of 0xbeef
	0xf0ff0001 - player with infinite health with the id of 0x0001
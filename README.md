# linux script
```
mkdir <folder name> :tạo thư mục 
touch < file name> : tạo file 

```
1
2
3
4
5
6
7
8
9
10

4 item / page 
page = n/perPage = 3 
perPage = 4
firstPage = 1
endPage = 3

page 1: 1 2 3 4 
page 2:5 6 7 8
page 3: 9 10

lay du lieu page  n = 1;

1-> (n-1)+1, n    =  1 2 3 4 
for(i = 1 ;i< perPage ;i++)
{
    (n-1) = 0;
    sanpham = i+(n-1).perpage;
}
n = 2: ->4((1-1).4)
1000/4=250
997 998 999 1000
1+(250-1)*4
= 1+ 249*4
= 1+  996 = 997
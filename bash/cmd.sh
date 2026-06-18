# 1 liste dossier ls
# Liste le repertoire courant pwd
# crer un dossier mkdir nom_du_dossier

read -p "Enter my siteweb: " name
echo "Your siteweb is: $name"
cd bash


for i in $(seq 1 10);
do
    rm -rf "$name $i"
    rm -rf "$i"
    echo $i
done


# read -p "Enter my siteweb: " name
# echo "Your siteweb is: $name"
# cd bash
# mkdir $name
# cd $name
# touch index.html
# mkdir css
# cd css
# touch style.css
# cd ..
# mkdir js
# cd js
# touch script.js


# read -p "Enter fullname: " fullname
# echo "Your fullname is: $fullname"
# cd bash 
# mkdir $fullname
# cd $fullname
# touch $fullname.txt
# ls -al



# qui contien le text
# a="Lyam sera le meilleure dev"
# echo $a

# b=2
# c=3
# d=$((b+c))
# e=$((b*c))
# f=$((b/c))
# g=$((b-c))
# i=$((b%c))
# h=$((b**c))
# echo $d
# echo $e
# echo $f
# echo $g
# echo $h

# ls -al
# pwd
# cd bash
# mkdir nom_du_dossier

# aaa="xxx"
# if [[ "$aaa" == "bbb" ]]; then
#    echo "bbb"
# elif [[ "$aaa" == "ccc" ]]; then
#    echo "ccc"
# else
#    echo "something else"
# fi
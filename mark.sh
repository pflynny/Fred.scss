#!/bin/bash

function instructions {
	echo "usage: mark.sh [input.scss] [output.md]"
	exit
}

if [ -z "$1" ]
then
	instructions
fi

if [ -z "$2" ]
then
	instructions
fi

file=$1
output=$2

capture=0
echo "" > "$output"

while IFS= read p; do
	if [[ "$p" == \/\*\* ]]
	then
		echo -e "\n" >> "$output"
		capture=1
	else
		if [[ "$p" == \*\/ ]]
		then
			capture=0
		else
			if [ $capture == 1 ]
			then
				echo -e "$p" >> "$output"
			fi

		fi
	fi
done < $file

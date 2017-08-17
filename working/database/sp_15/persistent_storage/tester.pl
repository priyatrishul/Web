#!/usr/bin/perl

# You can include your own libraries two ways, by the use statment or by
# adding your path to @INC which is an array of PATHs that are available
# to the perl interpreter.

#use lib '/home/jadrn000/database/sp_15/persistent_storage';
push @INC, '/home/jadrn000/database/sp_15/persistent_storage';
use PersistentStorage;

my $storage = PersistentStorage->new('mydata.dat');

$storage->insert("1","one");
$storage->insert("2","two");
$storage->insert("3","three");
$storage->insert("4","four");
$storage->insert("5","five");
$storage->insert("6","six");
$storage->insert("7","seven");
$storage->insert("8","eight");
$storage->insert("9","nine");
$storage->insert("10","ten");

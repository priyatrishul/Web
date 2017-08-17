#!/usr/bin/perl

use lib '/home/jadrn000/database/sp_15/persistent_storage';
use PersistentStorage;

my $storage = PersistentStorage->new('mydata.dat');

print "The key 1 returns " .$storage->get_value("1") . "\n";
print "The value \'one\' returns " .$storage->get_key("one")."\n";
print "The key 3 returns " .$storage->get_value("3") . "\n";
print "The keys in the database are: \n";
@data = $storage->get_keys();
foreach $item(@data) {
    print "*** $item\n";
    }
print "The values in the database (ordered by the keys) are: \n";    
@data = $storage->get_values();
foreach $item(@data) {
    print "*** $item\n";
    }    
$storage->delete("3");
if($storage->contains_key("3")) {
    print "ERROR, the key 3 returns " .$storage->get_value("3") . "\n";
    }
else {
    print "The database does not contain the key 3\n";
    }
    
if($storage->contains_key("1")) {
    print "The key 1 returns " .$storage->get_value("1") . "\n";
    }
else {
    print "The database does not contain the key 1\n";
    }    

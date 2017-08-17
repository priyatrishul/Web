#!/usr/bin/perl 

#   file upload script.  
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination 
#   directory for the uploaded file must have permissions set to 777.  
#   Do NOT set 777 permission on any other directory in your account!
#   
#   CS645, Spring 2015
#   Alan Riggins

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use CGI::Session;
use Crypt::SaltedHash;
####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn043/public_html/proj1/ajax_upload/_product_visual';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################
my $response="";
my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn043SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
print $q->header( -cookie=>$cookie );
my $sid = $session->id;
if($cookie_sid ne $sid) {

$response="no";


print $response; 
return;
}

my $filename = $q->param("product_image");
unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my $mimetype = $q->uploadInfo($filename)->{'Content-Type'};

# check the mime type and if it is not an image, reject it.
if($mimetype !~ /image/) {
    die "Invalid mime type, $mimetype";
    }    
    
my ($name, $path, $extension) = fileparse($filename, '/..*/');
$filename = $name.$extension;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   

$filename = untaint($filename);
$filename = lc($filename);
# get a handle on the uploaded image     
my $filehandle = $q->upload("product_image"); 

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    if($_ =~ /\<\?php/) {
        die "Invalid file, php tag found!";
        }
    print UPLOADFILE $_;
    }
close UPLOADFILE;

###############################################################
sleep(5); ### added to show the busy wait icom
###############################################################

print <<EOF;
Content-type:  text/html

<h2>Success, the file $filename has been uploaded</h2>
EOF

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }

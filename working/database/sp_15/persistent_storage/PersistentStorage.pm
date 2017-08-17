#   PersistentStorage is a hashtable implementation that is persistent.  
#   All values stored in the hashtable retain their values after the script
#   terminates.  Standard map methods are provided.
#   This class uses semaphores to ensure data integrity.  An exclusive
#   lock is enabled when modifications are performed.
#   To use this with CGI scripts, you must create the datafile first, and
#   set permissions on it to 666.  Otherwise, the file open will fail
#   because user 'wwwrun' does not have sufficient permissions to do this.
#
#   Alan Riggins
#   CS645, Spring 2015

package PersistentStorage;

use DB_File;
use Fcntl ':flock';

my (%database, $db, $fd);

#   The constructor takes one argument, the name of the datafile on disk
sub new {
    if(@_ != 2) {
        die "Error, new requires one parameter, the filename\n";
        }    
    my ($class, $filename) = @_;
    my $self = {};
    bless $self, $class;  # supports inheritance
    $db = tie %database, 'DB_File', $filename, O_CREAT | O_RDWR, 0666
        or die "ERROR, cannot create/open database file.";
        
    # A standard Perl filehandle is needed to enable semaphores.
    $fd = $db->fd();
    
    # the +<&=$fd is 'open for read/write, and reuse the filehandle of $fd
    # previously created.  Thus, two handles for the same file, with the
    # sandard file handle object for use with semaphores.
    open DATAFILE, "+<&=$fd" or die "ERROR, cannot create/open database file.";
    return $self;
    }      
    
#   Inserts a new KEY/VALUE pair in the db.  Does not check to see if the KEY
#   is already there, but silently overwrites the old value with the new one.    
sub insert {
    if(@_ != 3) {
        die "Error, insert requires two parameters, the KEY and VALUE\n";
        }
    my ($self, $key, $value) = @_;
    flock(DATAFILE, LOCK_EX) or die "ERROR acquiring file lock\n";    
    $database{$key} = $value;
    flock(DATAFILE, LOCK_UN) or die "ERROR file lock not released\n";    
    } 

#   The standard lookup function, takes a KEY as the single parameter, and returns
#   the VALUE associated with it, or an empty string if it is not in the db.    
sub get_value {
    if(@_ != 2) {
        die "Error, find requires one parameter, the KEY\n";
        }
    my ($self, $key) = @_;
    return $database{$key};
    } 

#   Reverse lookup.  Takes a VALUE and finds a matching KEY.  There may be more
#   than one matching value, in which case, the first one found will be returned,
#   or the empty string if the VALUE is not in the db.    
sub get_key {
    if(@_ != 2) {
        die "Error, find requires one parameter, the VALUE\n";
        }
    my ($self, $value) = @_;
    @k = keys %database;
    @v = values %database;
    foreach $key (@k) {
        $tmp = shift @v;       
        if($tmp eq $value) {
            return $key;    
            }
        }        
    }

#   Removes the KEY/VALUE pair associated with the KEY parameter.    
sub delete {                
    if(@_ != 2) {
        die "Error, find requires one parameter, the KEY to delete\n";
        }
    my ($self, $key) = @_;
    flock(DATAFILE, LOCK_EX) or die "ERROR acquiring file lock\n";    
    delete $database{$key};
    flock(DATAFILE, LOCK_UN) or die "ERROR file lock not released\n";    
    } 
 
#   Returns an array of the keys in the db, in sorted order    
sub get_keys {
    my @keys = keys %database;
    return sort @keys;
    } 
 
#   Returns an array of the values in the db, sorted on the keys    
sub get_values {
    my(@keys, @values, $k);
    my @keys = get_keys();
    foreach $k (@keys) {
        push @values, $database{$k};
        }
    return @values;
    }    

#   Simple lookup method, returns true if the KEY is in the db, false otherwise.    
sub contains_key {
    if(@_ != 2) {
        die "Error, find requires one parameter, the KEY to look for\n";
        }         
    my ($self, $key) = @_;      
    if($database{$key}) {
        return 1;
        }
    return 0;
    }

#   Destructor closes the db file and unties the db hash    
END {
    close DATAFILE;
    untie %database;
    }     
    
1;  # modules must always return 1 as the last thing in the file.

<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * The User entity represent a user.
 * 
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 * 
 * @package MoPad\AdminBundle\Entity
 */
class User extends BaseUser
{
    /**
     * id
	 * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

	/**
	 * constructor
	 */
    public function __construct()
    {
        parent::__construct();
    }
}